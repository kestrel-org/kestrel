import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";

import { ExampleService } from "../../../../services/example.service";

import { User } from "../../../../interfaces/user";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";

enum SUCCESS_SWAL_TYPE {
  delete,
  edit,
  view,
  create,
}

const SUCCESS_SWAL_TITLE_STRING = {
  delete: "Deleted !",
  edit: "Updated !",
  view: "Loaded !",
  create: "Added !",
};

const SUCCESS_SWAL_TEXT_STRING = {
  delete: "The user has been deleted.",
  edit: "The user has been updated.",
  view: "The details have been loaded.",
  create: "The user has been added.",
};

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"],
})
export class UsersListComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  @ViewChild("successSwal") private successSwal: SwalComponent;
  @ViewChild("errorSwal") private errorSwal: SwalComponent;

  dtOptions: DataTables.Settings = {};

  users: User[];
  userDetails: User;
  newUser: User = {
    id: undefined,
    login: "",
    password: "",
    email: "",
    createdAt: undefined,
    updatedAt: undefined,
  };

  isAddingUser = false;
  isLoadingUsers = false;

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private exampleService: ExampleService) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      responsive: true
    };

    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  async loadUsers() {
    this.isLoadingUsers = true;
    this.users = [];

    if (this.dtElement) {
      const dtInstance: DataTables.Api = await this.dtElement.dtInstance;
      dtInstance.destroy();
    }

    const data = await this.exampleService.getUsers();
    this.users = data.users;
    this.dtTrigger.next("");

    this.isLoadingUsers = false;
  }

  async addUser() {
    if (this.checkNewUser()) {
      await this.exampleService.postUsers(
        this.newUser.login,
        this.newUser.password,
        this.newUser.email
      );
      this.loadUsers();
      this.clearUserDetails();
      this.fireSuccessSwal(SUCCESS_SWAL_TYPE.create);
    } else {
      this.errorSwal.fire();
    }
  }

  async getDetails(id) {
    const data = await this.exampleService.getUsersById(id);
    this.userDetails = data.user;
    this.fireSuccessSwal(SUCCESS_SWAL_TYPE.view);
  }

  async deleteUser(id) {
    await this.exampleService.deleteUsersById(id);
    this.loadUsers();
    this.clearUserDetails();
    this.fireSuccessSwal(SUCCESS_SWAL_TYPE.delete);
  }

  async saveUser() {
    await this.exampleService.putUsers(
      this.userDetails.id,
      this.userDetails.login,
      this.userDetails.password,
      this.userDetails.email
    );
    this.loadUsers();
    this.clearUserDetails();
    this.fireSuccessSwal(SUCCESS_SWAL_TYPE.edit);
  }

  fireSuccessSwal(type: SUCCESS_SWAL_TYPE) {
    switch (type) {
      case SUCCESS_SWAL_TYPE.delete:
        this.successSwal.swalOptions = {
          title: SUCCESS_SWAL_TITLE_STRING.delete,
          text: SUCCESS_SWAL_TEXT_STRING.delete,
        };
        break;

      case SUCCESS_SWAL_TYPE.edit:
        this.successSwal.swalOptions = {
          title: SUCCESS_SWAL_TITLE_STRING.edit,
          text: SUCCESS_SWAL_TEXT_STRING.edit,
        };
        break;

      case SUCCESS_SWAL_TYPE.view:
        this.successSwal.swalOptions = {
          title: SUCCESS_SWAL_TITLE_STRING.view,
          text: SUCCESS_SWAL_TEXT_STRING.view,
        };
        break;

      case SUCCESS_SWAL_TYPE.create:
        this.successSwal.swalOptions = {
          title: SUCCESS_SWAL_TITLE_STRING.create,
          text: SUCCESS_SWAL_TEXT_STRING.create,
        };
        break;

      default:
        break;
    }

    this.successSwal.fire();
  }

  clearUserDetails() {
    this.userDetails = undefined;
    this.isAddingUser = false;
  }

  checkNewUser(): boolean {
    let ok = true;
    if (this.newUser.login == "" || !this.newUser.login) {
      ok = false;
    }
    if (this.newUser.password == "" || !this.newUser.password) {
      ok = false;
    }
    if (this.newUser.email == "" || !this.newUser.email) {
      ok = false;
    }

    return ok;
  }

  toggleIsAddingUser() {
    this.isAddingUser = !this.isAddingUser;
  }
}
