import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  toDoList: AngularFireList<any>;
  constructor(private firebaseDB: AngularFireDatabase) {

  }

  addTitle(title: string) {
    this.toDoList.push({
      title: title,
      isChecked: false,
    });
  }

  
  //this method sets the list and returns it  
  getToDoList() {
    this.toDoList = this.firebaseDB.list("titles");
    return this.toDoList;
  }

  toggleChecked($key: string, flag: boolean) {
    this.toDoList.update($key, {isChecked: flag});
  }

  removeTitle($key: string) {
    this.toDoList.remove($key);
  }

}
