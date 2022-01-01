import { Room } from '../../shared/room';
import { ApiService } from '../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css']
})

export class RoomsListComponent implements OnInit {
  RoomData: any = [];
  dataSource: MatTableDataSource<Room>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['_id', 'room_name', 'room_email', 'section', 'action'];

  constructor(private roomApi: ApiService) {
    this.roomApi.GetRooms().subscribe(data => {
      this.RoomData = data;
      this.dataSource = new MatTableDataSource<Room>(this.RoomData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
  }

  ngOnInit() { }

  deleteRoom(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.roomApi.DeleteRoom(e._id).subscribe()
    }
  }

}