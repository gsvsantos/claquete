import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, merge, Subject, timer } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

@Directive({
  selector: '[clqt-hover-scroll]',
})
export class HoverScroll implements OnInit, OnDestroy {
  @Input({ required: true }) public scrollTarget!: ElementRef<HTMLElement>;
  @Input() public scrollDelta: number = 300;
  @Input() public scrollDirection: 'left' | 'right' = 'left';
  @Input() public scrollInterval: number = 750;

  private readonly destroy$ = new Subject<void>();

  public constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  public ngOnInit(): void {
    const nativeElement = this.elementRef.nativeElement;

    const start$ = merge(
      fromEvent<MouseEvent>(nativeElement, 'mouseenter'),
      fromEvent<TouchEvent>(nativeElement, 'touchstart').pipe(
        tap((event) => event.preventDefault()),
      ),
    );

    const stop$ = merge(
      fromEvent<MouseEvent>(nativeElement, 'mouseleave'),
      fromEvent<TouchEvent>(nativeElement, 'touchend'),
      fromEvent<TouchEvent>(nativeElement, 'touchcancel'),
    );

    start$
      .pipe(
        switchMap(() => timer(0, this.scrollInterval).pipe(takeUntil(stop$))),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        const element = this.scrollTarget.nativeElement;
        const signedDelta = (this.scrollDirection === 'left' ? -1 : 1) * this.scrollDelta;
        element.scrollBy({ left: signedDelta, behavior: 'smooth' });
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
