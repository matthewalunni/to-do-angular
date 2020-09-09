import { Component, OnInit } from '@angular/core';
import { ToDoService } from "./shared/to-do.service";

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'], 
  providers: [ToDoService],
})
export class ToDoComponent implements OnInit {
  toDoListArray: any[] = [];
  constructor(private toDoService: ToDoService) { }

  ngOnInit(): void {
    //turns firebaselist into a regular array
    this.toDoService.getToDoList().snapshotChanges().subscribe(
      item => {
        this.toDoListArray = [];
        item.forEach(element => {
          var x = element.payload.toJSON();
          x['$key'] = element.key;
          this.toDoListArray.push(x);
        });

        this.toDoListArray.sort((x, y) => {
          return x.isChecked - y.isChecked;
        })

      }
    )

    this.toDoListArray.sort(function(x, y) { 
      return x.isChecked - y.isChecked; 
    })



  }

  onAdd(itemTitle) {
    this.toDoService.addTitle(itemTitle.value);
    itemTitle.value=null;
  }

  toggleChecked($key: string, isChecked) {
    this.toDoService.toggleChecked($key, !isChecked);
  }

  onDelete($key: string) {
    this.toDoService.removeTitle($key);
  }

}
