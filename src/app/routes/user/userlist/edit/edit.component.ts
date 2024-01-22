import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalHelper } from '@delon/theme';
import { SHARED_IMPORTS } from '@shared';
import { NzMessageService } from 'ng-zorro-antd/message';

import { UserApiService } from '../../apis/user.api.service';
import { UserDetail } from '../../model';
import { UserBindRoleComponent } from '../bindrole/user-bind-role.component';

@Component({
  selector: 'app-user-userlist-edit',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './edit.component.html'
})
export class UserlistEditComponent implements OnInit {
  record: UserDetail = {};
  i = {};
  allRoles: Array<{ id: number; name: string }> = [];
  form = this.fb.group({
    id: null,
    username: ['', [Validators.minLength(5), Validators.maxLength(10)]],
    nickName: [''],
    email: ['', [Validators.email]],
    phone: [''],
    roles: [[]],
    accountExpired: false,
    accountLocked: false,
    enable: true
  });

  a: UserDetail = {
    id: 1
  };

  constructor(
    private fb: UntypedFormBuilder,
    private modal: ModalHelper,
    private msgSrv: NzMessageService,
    private route: ActivatedRoute,
    private router: Router,
    private userApiService: UserApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      console.log(id);
      this.userApiService.getUser(Number(id)).subscribe(res => {
        this.form.setValue(res.data);
      });
    }
    // this.http.get('/role/list').subscribe(res => {
    //   this.allRoles = res;
    // });
  }

  save(): void {
    if (this.form.valid) {
      this.userApiService.saveUser(this.form.value).subscribe(res => {
        if (res.code === 200) {
          this.msgSrv.success('保存成功');
          this.back();
        }
      });
    }
  }

  back(): void {
    this.router.navigateByUrl('/user/user');
  }

  close(): void {
    // this.modal.destroy();
    this.back();
  }

  compareFn(c1: { id: number; name: string }, c2: number): boolean {
    return c1 && c2 ? c1.id === c2 : c1.id === c2;
  }

  bind(): void {
    this.modal.createStatic(UserBindRoleComponent).subscribe(s => {});
  }
}
