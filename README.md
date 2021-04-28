# ezTB6612

本库为树莓派驱动使用, 使用RPIO库实现引脚功能。

通过百分比控制电机速度，方便快捷。

目前只在树莓派4上进行了测试。有问题请提issue。

我买的是这家的小车，配的是以下驱动板
https://item.taobao.com/item.htm?spm=a1z10.3-c-s.w4002-21903724832.9.155e1cf0AGTI4w&id=602885245080

商家给的[资料](./TB6612Doc.rar)

## 安装

```shell
npm install eztb6612 ezpwmforraspberry --save

```

## 使用

如果调用doForward()发现电机转向不对，请调用motorpin1和motorpin2的顺序即可。

motorpwmpin引脚一定是树莓派上的pwm引脚。


### 驱动单个马达

```javascript
const ezTB6612 = require('eztb6612')

// motorpin1 motorpin2 motorpwm， 是rpio的物理引脚

let ezTB6612Mgr = new ezTB6612(motor1pin1, motor1pin2, motor1pwmpin);

// 更新电机速度
ezTB6612Mgr.updateMotorSpeed(50); 

// 向前
ezTB6612Mgr.doForward();

// 向后
ezTB6612Mgr.doBackward();

```

### 驱动两个马达

```javascript
const ezTB6612 = require('eztb6612')

// motorpin1 motorpin2 motorpwm， 是rpio的物理引脚

let ezTB6612Mgr = new ezTB6612(motor1pin1, motor1pin2, motor1pwmpin, motor2pin1, motor2pin2, motor2pwmpin);

// 更新两个电机速度
ezTB6612Mgr.updateMotorSpeed(50); 

// 两个电机向前
ezTB6612Mgr.doForward();

// 两个电机向后
ezTB6612Mgr.doBackward();

// 单个电机速度更新
ezTB6612Mgr.updateMotorSpeed(50, ezTB6612Mgr.getAllMotors()[0]); 

// 单个电机向前
ezTB6612Mgr.doForward(ezTB6612Mgr.getAllMotors()[0]);

// 单个电机向后
ezTB6612Mgr.doBackward(ezTB6612Mgr.getAllMotors()[0]);

```



有技术问题可微信我

![wechat](./vx.jpeg)
