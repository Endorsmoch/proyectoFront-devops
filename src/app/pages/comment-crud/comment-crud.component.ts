import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentCrud } from 'src/app/interfaces/comment-crud';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment-crud',
  templateUrl: './comment-crud.component.html',
  styleUrls: ['./comment-crud.component.css']
})
export class CommentCrudComponent implements AfterViewInit, OnInit{
  commentList: CommentCrud[] = [];
  displayedColumns: string[] = ['id', 'idProduct', 'idUser', 'date', 'text', 'likes', 'acciones'];

  //Edit Card
  isEditionCardVisible: boolean = false;

  //Creation Card
  isCreationCardVisible: boolean = false;

  //Deletion Card
  isDeletionCardVisible: boolean = false;

  dataSource = new MatTableDataSource<CommentCrud>([]);
  selectedComment: CommentCrud = { id: 0, idProduct: 0, idUser:0, date: '', text:'', likes: 0 };

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private commentService: CommentService){ }

  ngOnInit(){
    this.commentService.getAll().subscribe(
      data => {
        this.commentList = data;
        this.dataSource = new MatTableDataSource<CommentCrud>(this.commentList);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log(error);
      }
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  toggleEditionCardVisibility() {
    this.isEditionCardVisible = !this.isEditionCardVisible;
  }

  toggleCreationCardVisibility() {
    this.isCreationCardVisible = !this.isCreationCardVisible;
  }

  toggleDeletionCardVisibility() {
    this.isDeletionCardVisible = !this.isDeletionCardVisible;
  }

  editComment(comment: CommentCrud) {
    this.selectedComment = comment;
  }

  createComment() {
    this.commentService.create(this.selectedComment.idProduct, this.selectedComment.idUser, this.selectedComment.text, this.selectedComment.likes).subscribe(
      () => {
        console.log('Comentario creado exitosamente');
        this.selectedComment = { id: 0, idProduct: 0, idUser:0, date: '', text:'', likes: 0 };
        location.reload();
      },
      error => {
        console.log('Error al crear el comentario: ', error);
      }
    )
  }

  saveChanges() {
    this.commentService.update(this.selectedComment.id, this.selectedComment.idProduct, this.selectedComment.idUser, this.selectedComment.date, this.selectedComment.text, this.selectedComment.likes).subscribe(
      () => {
        console.log('Comentario actualizado exitosamente');
        this.selectedComment = { id: 0, idProduct: 0, idUser:0, date: '', text:'', likes: 0 };
      },
      error => {
        console.log('Error al actualizar el comentario: ',error);
      }
    )   
  }

  cancelEdit() {
    this.selectedComment = { id: 0, idProduct: 0, idUser:0, date: '', text:'', likes: 0 };
  }

  deleteComment() {
    this.commentService.delete(this.selectedComment.id).subscribe(
      () => {
        console.log('Comentario eliminado exitosamente');
        this.selectedComment = { id: 0, idProduct: 0, idUser:0, date: '', text:'', likes: 0 };
        location.reload();
      },
      error => {
        console.log('Error al eliminar el comentario: ', error);
      }
    )
  }

}
