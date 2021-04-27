const rpio = require('rpio');
const ezPWM = require('ezpwmforraspberry');
const PWM = new ezPWM();

class ezTB6612 {
    constructor(motor1pin1, motor1pin2, motor1pwmpin, motor2pin1, motor2pin2, motor2pwmpin){
        this.motors = [];
        if(motor1pin1 && motor1pin2 && motor1pwmpin) {
            let motor1 = this.motorFactory(motor1pin1, motor1pin2, motor1pwmpin);
            this.motors.push(motor1);
        }
        if(motor2pin1 && motor2pin2 && motor2pwmpin) {
            let motor2 = this.motorFactory(motor2pin1, motor2pin2, motor2pwmpin);
            this.motors.push(motor2);
        }
    }

    getAllMotors(){
        return this.motors;
    }

    motorFactory(pin1, pin2, pwmpin){
        return new Motor(pin1, pin2, pwmpin);
    }

    updateMotorSpeed(percent, motor){
        if(motor){
            motor.updateMotorSpeed(percent);
        }else{
            if(this.motors && this.motors.length >0) {
                this.motors[0].updateMotorSpeed(percent);
            }
            if(this.motors && this.motors.length >1) {
                this.motors[1].updateMotorSpeed(percent);
            }
        }
    }

    doForward(motor){
        if(motor) {
            motor.doForward();
        }else{
            if(this.motors && this.motors.length >0) {
                this.motors[0].doForward();
            }
            if(this.motors && this.motors.length >1) {
                this.motors[1].doForward();
            }
        }
    }

    doBackward(motor){
        if(motor) {
            motor.doBackward();
        }else{
            if(this.motors && this.motors.length >0) {
                this.motors[0].doBackward();
            }
            if(this.motors && this.motors.length >1) {
                this.motors[1].doBackward();
            }
        }
    }

    doStop(motor){
        if(motor) {
            motor.doStop();
        }else{
            if(this.motors && this.motors.length >0) {
                this.motors[0].doStop();
            }
            if(this.motors && this.motors.length >1) {
                this.motors[1].doStop();
            }
        }
    }


}


class Motor{
    constructor(pin1, pin2, pwmpin){
        this.pin1 = pin1;
        this.pin2 = pin2;
        this.pwmpin = pwmpin;
        PWM.openPWMByPercent(this.pwmpin);
    }

    updateMotorSpeed(percent){
        PWM.updatePWMByPercent(this.pwmpin, percent);
    }
    
    doForward(){
        rpio.open(this.pin1, rpio.OUTPUT, rpio.HIGH);
        rpio.open(this.pin2, rpio.OUTPUT, rpio.LOW);
    }

    doBackward(){
        rpio.open(this.pin2, rpio.OUTPUT, rpio.HIGH);
        rpio.open(this.pin1, rpio.OUTPUT, rpio.LOW);
    }

    doStop(){
        rpio.open(this.pin2, rpio.OUTPUT, rpio.LOW);
        rpio.open(this.pin1, rpio.OUTPUT, rpio.LOW);
    }
}

module.exports = ezTB6612;