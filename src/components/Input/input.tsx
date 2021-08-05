import { FC, ReactElement, InputHTMLAttributes, ChangeEvent } from 'react'
import classNames from 'classnames'
import { IconProp} from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon'
type InputSize = 'lg' | 'sm'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'>{
    disabled?: boolean;
    /**尺寸 */
    size?: InputSize;
    icon?:IconProp;
    /**前缀 */
    prepand?: string | ReactElement;
    /**后缀 */
    append?: string | ReactElement;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
export const Input: FC<InputProps> = (props) => {
    // 取出属性
    const { disabled, size, icon, prepand, append, style, ...restProps } = props
    // 根据属性计算不同的className
    const classes = classNames("fomalhaut-input-wrapper", {
        "is-disabled": disabled,
        [`input-${size}`]: size,
        "input-group": prepand || append,
        "input-group-prepand": !!prepand,
        "input-group-append": !!append
    })

    const fixControlledValue = (value: any) => {
        if (typeof value === 'undefined' || value === null) {
            return ''
        }
        return value
    }

    if('value' in props) {
        delete restProps.defaultValue
        restProps.value = fixControlledValue(props.value)
    }
    return (
        <div className={classes} style={style}>
            {prepand && <div className="fomalhaut-input-prepand">{prepand}</div>}
            {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}/></div>}
            <input className="fomalhaut-input" disabled={disabled} {...restProps}/>
            {append && <div className="fomalhaut-input-append">{append}</div>}
        </div>
        
    )
}

Input.defaultProps = {
    size: 'lg',
    disabled: false
}

export default Input