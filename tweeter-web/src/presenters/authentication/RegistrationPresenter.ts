import { Buffer } from "buffer";
import { ChangeEvent } from "react";
import { UserService } from "../../service/UserService";
import { NavigatorView, Presenter } from "../Presenter";

export interface RegisterView extends NavigatorView {
    setImageUrl: (url: string) => void
    setImageBytes: (data: Uint8Array) => void
    setImageFileExtension: (extension: string) => void
}

export class RegistrationPresenter extends Presenter<RegisterView> {
    private userService: UserService;

    public constructor(view: RegisterView) {
        super(view);
        this.userService = new UserService();
    }

    public checkSubmitButtonStatus(
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        imageUrl: string,
        imageFileExtension: string
    ): boolean {
        return (
          !firstName ||
          !lastName ||
          !alias ||
          !password ||
          !imageUrl ||
          !imageFileExtension
        );
    };

    public registerOnEnter(
        event: React.KeyboardEvent<HTMLElement>,
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        imageUrl: string,
        imageBytes: Uint8Array,
        imageFileExtension: string,
        rememberMe: boolean
    ) {
        if (event.key == "Enter" && !this.checkSubmitButtonStatus(
            firstName,
            lastName,
            alias,
            password,
            imageUrl,
            imageFileExtension
        )) {
          this.doRegister(
            firstName,
            lastName,
            alias,
            password,
            imageBytes,
            imageFileExtension,
            rememberMe
          );
        }
    };

    public handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        this.handleImageFile(file);
    };

    public handleImageFile(file: File | undefined) {
        if (file) {
          this.view.setImageUrl(URL.createObjectURL(file));
    
          const reader = new FileReader();
          reader.onload = (event: ProgressEvent<FileReader>) => {
            const imageStringBase64 = event.target?.result as string;
    
            // Remove unnecessary file metadata from the start of the string.
            const imageStringBase64BufferContents =
              imageStringBase64.split("base64,")[1];
    
            const bytes: Uint8Array = Buffer.from(
              imageStringBase64BufferContents,
              "base64"
            );
    
            this.view.setImageBytes(bytes);
          };
          reader.readAsDataURL(file);
    
          // Set image file extension (and move to a separate method)
          const fileExtension = this.getFileExtension(file);
          if (fileExtension) {
            this.view.setImageFileExtension(fileExtension);
          }
        } else {
          this.view.setImageUrl("");
          this.view.setImageBytes(new Uint8Array());
        }
    };

    public getFileExtension(file: File): string | undefined {
        return file.name.split(".").pop();
    };

    public async doRegister(
        firstName: string,
        lastName: string,
        alias: string,
        password: string,
        imageBytes: Uint8Array,
        imageFileExtension: string,
        rememberMe: boolean
    ) {
        try {
          this.view.setIsLoading(true);
    
          const [user, authToken] = await this.userService.register(
            firstName,
            lastName,
            alias,
            password,
            imageBytes,
            imageFileExtension
          );
    
          this.view.updateUserInfo(user, user, authToken, rememberMe);
          this.view.navigate("/");
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to register user because of exception: ${error}`
          );
        } finally {
          this.view.setIsLoading(false);
        }
    };
}