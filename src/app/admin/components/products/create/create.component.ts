import { Component } from '@angular/core';
import { IxModule } from '@siemens/ix-angular';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [IxModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

}
