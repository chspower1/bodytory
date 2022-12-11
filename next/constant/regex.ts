export const EMAIL_REGEX = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
export const ACCOUNT_ID_REGEX = /^[a-zA-Z0-9]{6,}$/;
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
export const KR_EN_REGEX = /^[가-힣a-zA-Z]+$/;
export const ONLY_KR_REGEX = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
export const BIRTH_REGEX = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
