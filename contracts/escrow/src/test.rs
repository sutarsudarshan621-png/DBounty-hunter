//  contracts/escrow/src/test.rs
use soroban_sdk::{
    testutils::{Address as _, Ledger, LedgerInfo},
    token, Address, BytesN, Env, Symbol,
};

use crate::{EscrowContract, EscrowContractClient, EscrowError};

fn create_token_contract<'a>(env: &Env, admin: &Address) -> (Address, token::Client<'a>, token::StellarAssetClient<'a>) {
    let sac = env.register_stellar_asset_contract_v2(admin.clone());
    let address = sac.address();
    (
        address.clone(),
        token::Client::new(env, &address),
        token::StellarAssetClient::new(env, &address),
    )
}

fn set_time(env: &Env, ts: u64) {
    env.ledger().set(LedgerInfo {
        timestamp: ts,
        protocol_version: 22,
        sequence_number: 10,
        network_id: Default::default(),
        base_reserve: 10,
        min_temp_entry_ttl: 16,
        min_persistent_entry_ttl: 16,
        max_entry_ttl: 6_312_000,
    });
}

struct Setup<'a> {
    env: Env,
    contract: EscrowContractClient<'a>,
    token: token::Client<'a>,
    creator: Address,
    contributor: Address,
}

fn setup() -> Setup<'static> {
    let env = Env::default();
    env.mock_all_auths();
    set_time(&env, 1_000);

    let creator = Address::generate(&env);
    let contributor = Address::generate(&env);
    let token_admin = Address::generate(&env);

    let (_token_addr, token_client, token_admin_client) = create_token_contract(&env, &token_admin);
    token_admin_client.mint(&creator, &1_000_000);

    let contract_id = env.register_contract(None, EscrowContract);
    let contract = EscrowContractClient::new(&env, &contract_id);

    Setup {
        env,
        contract,
        token: token_client,
        creator,
        contributor,
    }
}

#[test]
fn full_happy_path_create_submit_approve() {
    let s = setup();
    let bounty_id = Symbol::new(&s.env, "bounty1");
    let proof = BytesN::from_array(&s.env, &[7u8; 32]);

    s.contract.create_bounty(
        &s.creator,
        &bounty_id,
        &500,
        &s.token.address,
        &2_000,
    );
    assert_eq!(s.token.balance(&s.creator), 1_000_000 - 500);
    assert_eq!(s.token.balance(&s.contract.address), 500);

    s.contract.submit_work(&bounty_id, &s.contributor, &proof);

    s.contract.approve_submission(&bounty_id, &s.creator);

    assert_eq!(s.token.balance(&s.contributor), 500);
    assert_eq!(s.token.balance(&s.contract.address), 0);

    let data = s.contract.get_bounty(&bounty_id).unwrap();

    assert_eq!(
        data.status,
        crate::BountyStatus::Completed
    );
}

#[test]
fn reject_then_resubmit_then_approve() {
    let s = setup();
    let bounty_id = Symbol::new(&s.env, "bounty1");
    let proof = BytesN::from_array(&s.env, &[1u8; 32]);

    s.contract.create_bounty(&s.creator, &bounty_id, &500, &s.token.address, &2_000);
    s.contract.submit_work(&bounty_id, &s.contributor, &proof);
    s.contract.reject_submission(&bounty_id, &s.creator);

    let data = s.contract.get_bounty(&bounty_id).unwrap();

    assert_eq!(
        data.status,
        crate::BountyStatus::Open
    );

    assert!(data.contributor.is_none());

    // Resubmit before deadline, then approve.
    s.contract.submit_work(&bounty_id, &s.contributor, &proof);
    s.contract.approve_submission(&bounty_id, &s.creator);
    assert_eq!(s.token.balance(&s.contributor), 500);
}

#[test]
fn refund_after_expiry_with_no_submission() {
    let s = setup();
    let bounty_id = Symbol::new(&s.env, "bounty1");

    s.contract.create_bounty(&s.creator, &bounty_id, &500, &s.token.address, &2_000);
    assert_eq!(s.token.balance(&s.creator), 1_000_000 - 500);

    set_time(&s.env, 2_001); // past deadline
    s.contract.refund_creator(&bounty_id);

    assert_eq!(s.token.balance(&s.creator), 1_000_000);
    let data = s.contract.get_bounty(&bounty_id).unwrap();

    assert_eq!(
        data.status,
        crate::BountyStatus::Expired
    );
}

#[test]
fn only_creator_can_approve() {
    let s = setup();
    let bounty_id = Symbol::new(&s.env, "bounty1");
    let proof = BytesN::from_array(&s.env, &[2u8; 32]);
    let impostor = Address::generate(&s.env);

    s.contract.create_bounty(&s.creator, &bounty_id, &500, &s.token.address, &2_000);
    s.contract.submit_work(&bounty_id, &s.contributor, &proof);

    let result = s.contract.try_approve_submission(&bounty_id, &impostor);
    assert_eq!(result, Err(Ok(EscrowError::NotCreator)));
}

#[test]
fn cannot_submit_after_deadline() {
    let s = setup();
    let bounty_id = Symbol::new(&s.env, "bounty1");
    let proof = BytesN::from_array(&s.env, &[3u8; 32]);

    s.contract.create_bounty(&s.creator, &bounty_id, &500, &s.token.address, &2_000);
    set_time(&s.env, 2_001);

    let result = s.contract.try_submit_work(&bounty_id, &s.contributor, &proof);
    assert_eq!(result, Err(Ok(EscrowError::DeadlinePassed)));
}

#[test]
fn cannot_refund_before_expiry() {
    let s = setup();
    let bounty_id = Symbol::new(&s.env, "bounty1");

    s.contract.create_bounty(&s.creator, &bounty_id, &500, &s.token.address, &2_000);

    let result = s.contract.try_refund_creator(&bounty_id);
    assert_eq!(result, Err(Ok(EscrowError::NotExpiredYet)));
}

#[test]
fn cannot_double_approve() {
    let s = setup();
    let bounty_id = Symbol::new(&s.env, "bounty1");
    let proof = BytesN::from_array(&s.env, &[4u8; 32]);

    s.contract.create_bounty(&s.creator, &bounty_id, &500, &s.token.address, &2_000);
    s.contract.submit_work(&bounty_id, &s.contributor, &proof);
    s.contract.approve_submission(&bounty_id, &s.creator);

    let result = s.contract.try_approve_submission(&bounty_id, &s.creator);
    assert_eq!(result, Err(Ok(EscrowError::InvalidStatus)));
}
