import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <div class="row">
        <div class="col-sm-6 text-left">
          &copy; 2017 {{title}}
        </div>
        <div class="col-sm-6 text-right">
          <a href="mailto:{{contactEmailAddress}}">Email Us</a>
        </div>
      </div>
    </footer>
  `
})
export class AppFooterComponent {
  @Input() title: string = this.title;
  contactEmailAddress: string = 'support@example.com';
}
