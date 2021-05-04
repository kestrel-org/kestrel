import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";

import { ExempleService } from "../../../../services/exemple.service";

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
  delete: "Supprimé !",
  edit: "Modifié !",
  view: "Chargé !",
  create: "Ajouté !",
};

const SUCCESS_SWAL_TEXT_STRING = {
  delete: "L'utilisateur a été supprimée.",
  edit: "L'observation a été modifiée.",
  view: "Les détails ont bien été chargés.",
  create: "L'utilisateur a bien été créé.",
};

@Component({
  selector: "app-liste-users",
  templateUrl: "./liste-users.component.html",
  styleUrls: ["./liste-users.component.scss"],
})
export class ListeUsersComponent implements OnInit, OnDestroy {
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

  constructor(private exempleService: ExempleService) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      responsive: true,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.24/i18n/French.json",
      },
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

    const data = await this.exempleService.getUsers();
    this.users = data.users;
    this.dtTrigger.next("");

    this.isLoadingUsers = false;
  }

  async addUser() {
    if (this.checkNewUser()) {
      await this.exempleService.postUsers(
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
    const data = await this.exempleService.getUsersById(id);
    this.userDetails = data.user;
    this.fireSuccessSwal(SUCCESS_SWAL_TYPE.view);
  }

  async deleteUser(id) {
    await this.exempleService.deleteUsersById(id);
    this.loadUsers();
    this.clearUserDetails();
    this.fireSuccessSwal(SUCCESS_SWAL_TYPE.delete);
  }

  async saveUser() {
    await this.exempleService.putUsers(
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
