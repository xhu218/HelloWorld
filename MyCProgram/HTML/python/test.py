from myemail import sendmail
from myemail import sendemailprocess

for i in range(1,10):
	print i;
	if i==5:
		break;


class ClassA(object):

    @staticmethod
    def func_a():
        print('Hello Python')

if __name__ == '__main__':
    ClassA.func_a()
    ca = ClassA()
    ca.func_a()		
    #sendmail("good")

    sendemailprocess("gen2","E:\\Work\\HelloWorld.git\\trunk\\MyCProgram\\HTML\\python\\bug\\gen2\\2018-09-20 181551.log")



