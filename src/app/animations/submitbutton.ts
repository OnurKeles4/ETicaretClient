import {
  Component,
  Inject,
  Input,
  NgModule,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../services/ui/animation/animation-service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'submit-button',
  template:  `<button id="animateButton"> {{flag}} </button>` ,
  standalone: true,
  styleUrls: ['../admin/components/products/delete/delete.component.scss'],
})

export class SubmitButton implements OnDestroy {
  //flag: boolean;
  aniText: string;
  subscription: Subscription;
  aniProgress: boolean;

  flag: boolean;

  constructor(private renderer: Renderer2, private dataService: DataService, @Inject(DOCUMENT) private document: Document) {
    console.log('SubmitButton setData');

    this.subscription = this.dataService.dataObs.subscribe((data) => {
      //console.log('Data received in Listener Component:', data);
      this.flag = data; 
      
      this.AniButton();
    });
  }

  
  public AniButton() {
    console.log('AniButton');

    const button = document.getElementById('animateButton');    
    console.log(button);
    if (button) {
      if (this.aniProgress) this.stopAnimation();

      console.log('button exists!');
      console.log(this.flag);
      this.flag
        ? (this.aniText = 'scale-animation')
        : (this.aniText = 'scale-animation-error');

      this.renderer.addClass(button, this.aniText);
      this.aniProgress = true;
      const onAnimationEnd = () => {
        //to animate again, remove the old class
        this.renderer.removeClass(button, this.aniText);
        button.removeEventListener('animationend', onAnimationEnd);
        this.aniProgress = false;
      };
      button.addEventListener('animationend', onAnimationEnd);
    }
  }

  stopAnimation() {
    const button = document.getElementById('animateButton');
    if (button && this.aniText) {
      this.renderer.removeClass(button, this.aniText);
      this.aniProgress = false;
      console.log('Animation stopped');
    }
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}