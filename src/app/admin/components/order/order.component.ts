// src/app/my-component/my-component.component.ts

import { Component, OnInit, Renderer2 } from '@angular/core';
import { getElement } from '@siemens/ix-icons/dist/types/stencil-public-runtime';

@Component({
  selector: 'order-component',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent  {

  constructor(private renderer: Renderer2) { }

  

  deleteSelected(): void {
    const button = document.getElementById('animateButton');
    if (button) {
      //console.log("button exists!");
      //console.log(button);
      this.renderer.addClass(button, 'scale-animation');
      
      // Remove the class when the animation ends
      const onAnimationEnd = () => {
        this.renderer.removeClass(button, 'scale-animation');
        button.removeEventListener('animationend', onAnimationEnd);
      };
      button.addEventListener('animationend', onAnimationEnd);
    }
  }
}