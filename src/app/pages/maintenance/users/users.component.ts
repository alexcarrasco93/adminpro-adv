import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../../../models/user.model';
import { ImageModalService } from '../../../services/image-modal.service';
import { SearchesService } from '../../../services/searches.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent implements OnInit, OnDestroy {
  totalUsers = 0;
  users: User[] = [];
  usersTemp: User[] = [];
  from = 0;
  loading = true;
  imgSubs?: Subscription;
  constructor(
    private userService: UserService,
    private searchesService: SearchesService,
    private imageModalService: ImageModalService
  ) {}

  ngOnInit() {
    this.getUsers();

    this.imgSubs = this.imageModalService.newImage
      .pipe(delay(100))
      .subscribe(() => this.getUsers());
  }

  ngOnDestroy(): void {
    this.imgSubs?.unsubscribe();
  }

  getUsers() {
    this.loading = true;
    this.userService.getUsers(this.from).subscribe(({ users, total }) => {
      this.totalUsers = total;
      this.users = users;
      this.usersTemp = users;
      this.loading = false;
    });
  }

  changeUsersPage(value: number) {
    this.from += value;
    if (this.from < 0) {
      this.from = 0;
    } else if (this.from >= this.totalUsers) {
      this.from -= value;
    }

    this.getUsers();
  }

  search(term: string) {
    if (term.length === 0) {
      this.users = [...this.usersTemp];
      return;
    }
    this.searchesService
      .search('users', term)
      .subscribe((res) => (this.users = res as User[]));
  }

  deleteUser(uid: string) {
    if (uid === this.userService.user.uid) {
      Swal.fire('Deleted!', 'You cannot delete your own user', 'error');
      return;
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(uid).subscribe({
          next: () => {
            this.getUsers();
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          },
          error(err) {
            Swal.fire('Error', "The user couldn't be deleted", 'error');
          },
        });
      }
    });
  }

  changeRole(user: User) {
    console.log(user);
    this.userService.updateUser(user).subscribe({
      error(err) {
        Swal.fire('Error', "The role couldn't be changed", 'error');
      },
    });
  }

  openModal(user: User) {
    this.imageModalService.openModal(
      'users',
      user.uid!,
      user.img!,
      user.isGoogleImage
    );
  }
}
