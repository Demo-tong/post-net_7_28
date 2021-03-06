# post-net_7_28
采用JS语言实现如下功能：
打印菜单，让用户可以选择程序的三个功能：
    
    １、用户可以输入一个邮编（5 位，9位，或10位：9位就是1０位把“-”去掉后的样子），把它转换成一个「条码」（记得不要编码那个减号“-”）
    
    ２、用户可以输入一个「条码」，程序把它转回邮编，如果是 9 位的，记得加个“-”
    
    ３、退出

为了快速对信件进行分类，美国联邦邮政局鼓励信件量大的公司用「条码」来代替邮编。 这种「条码」只有一行，有两种高度。下图展示的是数字 0 - 9 对应的条码。竖线表示长行，冒号表示短行。

    1   :::||
    2   ::|:|
    3   ::||:
    4   :|::|
    5   :|:|:
    6   :||::
    7   |:::|
    8   |::|:
    9   |:|::
    0   ||:::

    示例：   |   |:|::   :|:|:   |:::|   :::||   ::||:   :|:|:   |
    条码：   Frame   Digit-1 Digit-2 Digit-3 Digit-4 Digit-5 CD  Frame
    95713   Bar (9) (5) (7) (1) (3) (5) Bar

完整条码的两边分别有一个全高的边框。邮编的每一位数字都被编码成对应的「条码」。所有数字都被编码后，后边会跟着一位「校验码」，它的计算规则如下：把邮编中的所有数字相加，然后所得的和加上「校验码」必须是 10 的倍数。 举个栗子：邮编 95713 所有数字求和是 25，那么，25 加多少能得到 10 的倍数呢？对了，就是 5，你真棒！25 + ５= 30，30 就是 10 的倍数，真是不可思议，你干的太漂亮了！这个 5 就是校验码，你明白了吧！ 邮编中的每一位数字，还有检验码都会通过下面的表格进行编码（注：下表只是上图的数字形式，1 表示全码，0 表示半码）:

        7   4   2   1   0
    1   0   0   0   1   1
    2   0   0   1   0   1
    3   0   0   1   1   0
    4   0   1   0   0   1
    5   0   1   0   1   0
    6   0   1   1   0   0
    7   1   0   0   0   1
    8   1   0   0   1   0
    9   1   0   1   0   0
    0   1   1   0   0   0

注意每一行都是两个全码和三个半码。从条码倒推数字也非常简单，根据每列的权重来就行了：7，4， 2， 1， 0。 来，举个栗子：6 的条码是：01100，所以如果我们要倒推它，只要一个公式即可：0*7 + 1*4 + 1*2 + 0*1 + 0*0 = 6。不可思议，对吧？！但你得注意，唯一的例外是数字 0，按权重公式计算的话，它的结果是 11。

