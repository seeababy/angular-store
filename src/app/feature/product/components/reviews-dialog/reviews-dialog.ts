import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reviews-dialog',
  templateUrl: './reviews-dialog.html',
  styleUrl: './reviews-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule],
})
export class ReviewsDialog {
  private dialogRef = inject(MatDialogRef<ReviewsDialog>);

  stars = [0, 1, 2, 3, 4];

  reviewForm = new FormGroup({
    comment: new FormControl('', [Validators.required, Validators.minLength(5)]),
    rating: new FormControl<number | null>(null, Validators.required),
  });

  handleStarClick(index: number): void {
    this.reviewForm.get('rating')?.setValue(index + 1);
  }

  submit(): void {
    if (this.reviewForm.invalid) return;

    this.dialogRef.close(this.reviewForm.value);
  }
}
