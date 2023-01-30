import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ANStyles } from '@core/animations/animations';
import { assign } from '@core/handlers/shared.handlers';
import { TSize } from '@core/types/state.types';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FileUpload } from '../../classes/FileUpload';
import { EnFile } from '../../enums/file.enum';
import { convertFileToBase64, filename } from '../../handlers/file.handlers';
import { FileService } from '../../services/file.service';
import {
  TFile,
  TFileCheckParams,
  TFilePayload,
  TFileUploadViewMode,
  TPayloadType,
} from '../../types/file.types';
import { trim } from '@core/handlers/string.handlers';

@UntilDestroy()
@Component({
  selector: 'ng-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  providers: [FileService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'uploadRef',
  animations: [
    ANStyles({
      fromStyle: {
        transform: 'translateY(-60%)',
        opacity: '0',
      },
      toStyle: {
        transform: 'translateY(0%)',
        opacity: '1',
      },
      enableLeave: false,
      animationName: 'ANShowLoadBlock',
    }),
  ],
})
export class UploadFileComponent implements OnInit {
  public file: File;

  @Input() public upload: boolean = false;
  @Input() public remove: boolean = false;
  @Input() public loading: boolean = false;
  @Input() public url: string;

  @Input('manipulator') manipulator$: Observable<
    (c: UploadFileComponent) => void
  >;
  @Input() public uploadTitle: string = 'Upload';
  @Input() public fileType: TFile = 'document-file';
  @Input() public payload: TPayloadType;
  @Input() public payloadData: any;
  @Input() public fileCheckParams: TFileCheckParams;
  @Input() public multiple: boolean = false;
  @Input() public showErrorToastr: boolean = true;
  @Input() public disabled: boolean = false;
  @Input() public size: TSize = 'medium';
  @Input() public emptyText: string = ' No file';
  @Input() public fullWidth: boolean = false;
  @Input() public viewMode: TFileUploadViewMode = 'standard';
  @Input() public filenameLimit: number = EnFile.FILE_NAME_LIMIT;

  @Output('changeFile') private _changeFile = new EventEmitter<FileUpload>();

  @ViewChild('fileRef') fileRef$: ElementRef<HTMLInputElement>;

  constructor(
    private cdr: ChangeDetectorRef,
    private toastrService: ToastrService,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    this.initManipulator();
  }

  public initManipulator(): void {
    if (this.manipulator$) {
      this.manipulator$
        .pipe(untilDestroyed(this))
        .subscribe((cb: (c: UploadFileComponent) => void) => {
          cb(this);
          this.cdr.detectChanges();
        });
    }
  }

  public getAccept(): string {
    const mime: string[] =
      this.fileCheckParams?.mime || this.getAcceptByType(this.fileType);

    return mime.toString();
  }

  private getAcceptByType(fileType: TFile): string[] {
    switch (fileType) {
      case 'document-file': {
        return this.fileService.getDataFromDB([
          'settings',
          'document-file',
          'mime',
        ]);
      }
      case 'shop-logo': {
        return this.fileService.getDataFromDB([
          'settings',
          'shop-logo',
          'mime',
        ]);
      }
    }
  }

  public getDownloadFileName(): string {
    switch (true) {
      case Boolean(this.payloadData || this.file): {
        return this.getFileName();
      }
      case Boolean(this.url): {
        return filename(this.url);
      }
      default: {
        return 'file';
      }
    }
  }

  public getFileNameTooltip(): string {
    const filename: string = this.getFileName();
    return filename.length > this.filenameLimit ? filename : null;
  }

  public get isDisabledDownload(): boolean {
    return this.disabled || this.loading;
  }

  public changeFile(e: Event): void {
    const file: File = (e.target as HTMLInputElement).files[0];
    const checkParams: TFileCheckParams = this.fileService.getFileCheckParams(
      this.fileType
    );
    const { isValid, errors } = this.fileService.checkFile(
      file,
      checkParams,
      this.fileType
    );

    isValid ? this.sendFile(file) : this.showErrors(errors);
  }

  private async sendFile(file: File): Promise<void> {
    const payload = await this.getPayload(file);
    const upload: FileUpload = new FileUpload(file, payload as any);

    this.file = file;
    this.url = file?.name;
    this._changeFile.emit(upload);
  }

  private showErrors(errors: string[]): void {
    if (this.showErrorToastr) this.toastrService.warning(errors.join('\n'));
  }

  public getFileName(): string {
    return this.payloadData?.fileName || this.file?.name;
  }

  public async getPayload(file: File): Promise<TFilePayload> {
    const { payloadData: data } = this;
    let payload: TFilePayload = null;

    switch (this.payload) {
      case 'img': {
        const preview = await convertFileToBase64(file);
        payload = { preview };

        break;
      }
    }

    return assign(payload, { data });
  }

  public removeFile(e: Event) {
    e.preventDefault();
    this.sendFile(null);
  }

  public middleTruncateLink(): string {
    const filename: string = this.getFileName();

    if (filename.length > this.filenameLimit) {
      const leftPart: string = trim(filename.slice(0, this.filenameLimit / 2));
      const rightPart: string = trim(filename.slice(-(this.filenameLimit / 2)));

      return `${leftPart}...${rightPart}`;
    }

    return filename;
  }
}
