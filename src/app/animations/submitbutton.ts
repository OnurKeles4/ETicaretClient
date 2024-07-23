import {
  Component,
  Inject,
  Input,
  NgModule,
  OnDestroy,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../services/ui/animation/animation-service';
import { DOCUMENT } from '@angular/common';
import { IxModule } from '@siemens/ix-angular';

@Component({
  selector: 'submit-button',
  imports: [IxModule],
  template: `
    <ix-button #animateButton id="animateButton"> {{ flag }} </ix-button>
  `,
  styleUrls: ['./submit-button.scss'],
  standalone: true,
})
export class SubmitButton implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('animateButton') animateButton: ElementRef<HTMLButtonElement>;
  aniText: string;
  subscription: Subscription;
  aniProgress: boolean;
  flag: boolean;

  constructor(
    private renderer: Renderer2,
    private dataService: DataService,
    @Inject(DOCUMENT) private document: Document
  ) {
    console.log('SubmitButton setData');

    this.subscription = this.dataService.dataObs.subscribe((data) => {
      this.flag = data;
      if (this.animateButton) {
        this.AniButton();
      }
    });
  }

  ngOnInit() {
    // Initialization logic if needed
  }

  ngAfterViewInit() {
    // Ensure that the button element is accessed after the view has been initialized
    if (this.animateButton) {
      this.AniButton();
    }
  }

  AniButton() {
    console.log('AniButton');

    const button = this.animateButton.nativeElement;

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
        // To animate again, remove the old class
        this.renderer.removeClass(button, this.aniText);
        button.removeEventListener('animationend', onAnimationEnd);
        this.aniProgress = false;
      };
      button.addEventListener('animationend', onAnimationEnd);
    }
  }

  stopAnimation() {
    const button = this.animateButton.nativeElement;
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
