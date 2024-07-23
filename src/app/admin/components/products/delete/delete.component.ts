import {
  Component,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { IxModule } from '@siemens/ix-angular';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../../../../services/common/models/product.service';
import {
  AlertifyService,
  MessageType,
  Position,
} from '../../../../services/admin/alertify.service';

declare function animateButton(): void;

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [IxModule, FontAwesomeModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss',
})
export class DeleteComponent {
  icon = faTrashCan;
  flag: boolean;
  aniText: string;
  aniProgress: boolean;
  @Input() selectedProduct: any;
  @Input() isDisabled!: boolean;

  @Output() messageEvent = new EventEmitter<boolean>();

  constructor(
    protected productservice: ProductService,
    private alertify: AlertifyService,
    private renderer: Renderer2
  ) {}
  
  public deleteSelected() {
    //console.log('Delete Selected in Delete, id:', this.selectedProduct.id);
    
    this.productservice.delete(this.selectedProduct.id).subscribe(
      () => {

        this.alertify.message('Ürün başarıyla silindi', {
          messageType: MessageType.Message,
          position: Position.BottomRight,
          delay: 3,
          dismissOthers: true,
        });

        this.flag = true;
        console.log('Normal:');
      
        this.AniButton();
      },
      () => {
        this.alertify.message('Ürün silinirken Hata oluştu', {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.BottomRight,
        });


        this.flag = false;
        console.log('Error occurred while deleting the product:');
        
        this.AniButton();
      }
    );
  }

  AniButton() {
    const button = document.getElementById('animateButton');
    
    if (button) {
      if(this.aniProgress) 
        this.stopAnimation();
      
      console.log("button exists!");
      console.log(this.flag);
      this.flag ? this.aniText = 'scale-animation' : this.aniText = 'scale-animation-error';
      
      this.renderer.addClass(button, this.aniText);
      this.aniProgress = true;
      const onAnimationEnd = () => {
        //to animate again, remove the old class
        this.renderer.removeClass(button, this.aniText);
        button.removeEventListener('animationend', onAnimationEnd);
        this.aniProgress = false;
      };
      button.addEventListener('animationend', onAnimationEnd);
      this.messageEvent.emit(true);
    }
    
    
  }

  stopAnimation() {
    const button = document.getElementById('animateButton');
    if (button && this.aniText) {
      this.renderer.removeClass(button, this.aniText);
      this.aniProgress = false;
      console.log('Animation stopped');
      this.messageEvent.emit(true);
    }
  }
}
