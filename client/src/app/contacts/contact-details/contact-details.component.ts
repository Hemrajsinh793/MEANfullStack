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

    this.activatedRoute.params.subscribe(params => {
      this.contact._id = params.id;
    });

    if(this.title === 'Edit Contact'){
      this.getContact(this.contact);
    }
  }

  private getContact(contact: Contact): void{
    this.contactListServices.getContact(contact).subscribe(data => {
      this.contact = data.contact;
    });
  }

  public onDetailsPageSubmit(): void{
    switch (this.title){
      case 'Add Contact':
      this.contactListServices.addContact(this.contact).subscribe(data => {
        if (data.success){
          this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeOut: 3000});
          this.router.navigate(['/contact/contact-list']);
        }else{
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeOut: 3000});
          this.router.navigate(['/contact/contact-list']);
        }
      });
      break;
      case 'Edit Contact':
      this.contactListServices.editContact(this.contact).subscribe(data => {
        if (data.success){
          this.flashMessage.show(data.msg, {cssClass: 'alert-sucess', timeOut: 3000});
          this.router.navigate(['/contact/contact-list']);
        }else{
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeOut: 3000});
          this.router.navigate(['/contact/contact-list']);
        }
      });
      break;
    }
  }

}
