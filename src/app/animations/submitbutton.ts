import { Component, Inject, OnDestroy, Renderer2, AfterViewInit, ViewChild, ElementRef, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { DataService } from '../services/ui/animation/animation-service';
import { IxModule } from '@siemens/ix-angular';

@Component({
  selector: 'submit-button',
  standalone: true,
  imports: [IxModule],
  template: `<ix-button id="animateButton" #animateButton> {{ flag }} </ix-button>`,
  styleUrls: ['./submit-button.scss']
})
export class SubmitButton implements AfterViewInit, OnDestroy {
  @ViewChild('animateButton') animateButton: ElementRef<HTMLButtonElement>;
  subscription: Subscription;
  aniProgress: boolean;
  flag: boolean;
  aniText: string;

  constructor(
    private renderer: Renderer2,
    private dataService: DataService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    console.log('SubmitButton setData');

    this.subscription = this.dataService.dataObs.subscribe(data => {
      console.log('Data received in Listener Component:', data);
      this.flag = data;

      if (isPlatformBrowser(this.platformId) && this.animateButton) {
        this.AniButton();
      }
    });
  }

  ngAfterViewInit() {
    // Ensure that the button element is accessed after the view has been initialized
    if (isPlatformBrowser(this.platformId) && this.animateButton) {
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
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
