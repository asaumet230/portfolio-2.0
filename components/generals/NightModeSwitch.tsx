import styles from './generals.module.css';

export function NightModeSwitch() {
    return (
        <div className={ styles['switch-toggle'] }>
            <label className={ styles['switch-label'] }>
                <input type="checkbox" className={ styles['switch-checkbox'] } />
                <span className={ styles['switch-slider'] }></span>
            </label>
        </div>
    )
}

export default NightModeSwitch;