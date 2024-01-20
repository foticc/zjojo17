export interface Pageable {
  page: number;
  size: number;
  sort?: string;

  [key: string]: any;
}

export interface CommonResult<T> {
  code: number;
  message: string;
  data: T;
}

export interface UserDetail {
  id?: number;
  username?: string;
  nickName?: string;
  email?: string;
  phone?: string;
  accountExpired?: boolean;
  accountLocked?: boolean;
  enable?: boolean;
  roles?: [];
}
