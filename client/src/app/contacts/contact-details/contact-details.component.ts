import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ContactListService } from 'src/app/services/contact-list.service';


@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  title: string;
  contact: Contact;

  constructor(
    private activatedRoute: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private contactListServices: ContactListService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data.title;
    this.contact = new Contact();
  }

  public onDetailsPageSubmit(): void{
    switch(this.title){
      case 'Add Contact':
      this.contactListServices.addContact(this.contact).subscribe(data=>{
        if(data.success){
          this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeOut: 3000});
          this.router.navigate(['/contact/contact-list']);
        }else{
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeOut: 3000});
          this.router.navigate(['/contact/contact-list']);
        }
      });
      break;
      case 'Edit Contact':
        break;
    }
  }

}
