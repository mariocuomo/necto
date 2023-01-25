def A():
	B()

def B():
	C()

def C():
	D()

def D():
	E()
	A()

def E():
	A()

def F():
	A()
	H()
	B()
	I()

def G():
	C()
	L()

def H():
	M()
	N()
	I()

def I():
	A()
	B()

def L():
	C()
	D()

def M():
	N()

def N():
	A()
	L()
	F()