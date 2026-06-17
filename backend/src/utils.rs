use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct Pagination {
    pub page: Option<u32>,
    pub limit: Option<u32>,
}

impl Pagination {
    pub fn page(&self) -> u32 {
        self.page.unwrap_or(1)
    }

    pub fn limit(&self) -> u32 {
        self.limit.unwrap_or(20)
    }

    pub fn offset(&self) -> i64 {
        ((self.page() - 1) * self.limit()) as i64
    }
}