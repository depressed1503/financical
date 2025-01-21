import "./CategoryIcon.css"

export default function CategoryIcon(props: {icon: string | undefined, color: string | undefined}) {
    return (
        <div className="icons_chooser__icon" style={{backgroundColor: props.color || "#ddd"}}>
            {props.icon}
        </div>
    )
}