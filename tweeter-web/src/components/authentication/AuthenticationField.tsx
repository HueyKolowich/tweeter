interface Props {
    type: string
    className: string
    id: string
    name: string
    placeholder: string
    keyDownHandler: (event: React.KeyboardEvent<HTMLElement>) => void
    onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const AuthenticationField = (props: Props) => {
    return (
        <div className="form-floating">
          <input
            type={props.type}
            className={props.className}
            size={50}
            id={props.id} 
            placeholder={props.placeholder}
            onKeyDown={props.keyDownHandler}
            onChange={props.onChangeHandler}
          />
          <label htmlFor={props.id}>{props.name}</label>
        </div>
    );
};

export default AuthenticationField;