export enum Environment {
  development = 'development',
  staging = 'staging',
  production = 'production',
}

export enum JobApplicationStatus {
  APPLIED = 'APPLIED',
  INTERVIEWING = 'INTERVIEWING',
  REJECTED = 'REJECTED',
  OFFER_EXTENDED = 'OFFER_EXTENDED',
  OFFER_ACCEPTED = 'OFFER_ACCEPTED',
}

export enum JobApplicationRejectionStatus {
  SALARY_MISMATCH = 'SALARY_MISMATCH',
  OPPORTUNITY_MISMATCH = 'OPPORTUNITY_MISMATCH',
  NO_RESPONSE_FROM_RECRUITER = 'NO_RESPONSE_FROM_RECRUITER',
}

export enum Currency {
  KES = 'KES',
  USD = 'USD',
  EURO = 'EURO',
  POUND = 'POUND',
}
