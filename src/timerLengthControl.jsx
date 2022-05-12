
export default function TimerLengthControl (props){
    return(
        <div id="timer-wrapper">
            <h2 id={`${props.type}-label`}> {props.title} </h2> 
            <div id={`${props.type}-length`} > {props.time} </div>
            <button id={`${props.type}-decrement`} onClick={props.handleDecrement}> <i class="arrow down"></i> </button>
            <button id={`${props.type}-increment`} onClick={props.handleIncrement}> <i class="arrow up"></i> </button>
        </div>
    )
}