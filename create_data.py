import re

file = open("example_script.py", "r")
functions={}
nodes={}

_id=0
while True:
	line = file.readline().rstrip()
	if not line:
		break

	# if match a definition search call
	if re.search('def\\s+[a-zA-Z_][a-zA-Z0-9_]*\\s*\\(\\s*\\)\\s*:\\s*', line):

		function_definition =  re.search('[a-zA-Z_][a-zA-Z0-9_]*\\s*\\(\\s*\\)\\s*', line).group(0)
		functions[function_definition]=[]
		nodes[function_definition]=_id
		
		while True:
			line = file.readline().rstrip()

			if not line:
				break 
			
			if re.search('def\\s+[a-zA-Z_][a-zA-Z0-9_]*\\s*\\(\\s*\\)\\s*:\\s*', line):
				break

			if re.search('\\w+\\s*\\(\\s*[\\w\\s,]*\\)', line):
				functions_call =  re.search('[a-zA-Z_][a-zA-Z0-9_]*\\s*\\(\\s*\\)\\s*', line).group(0)
				lst = functions[function_definition]
				lst.append(functions_call)
				functions[function_definition]=lst
		_id=_id+1
file.close()

print(functions.keys())

file = open("data.json", "w")
file.write("{\n\t\"nodes\": [\n")
for i,(nodo,_id) in enumerate(nodes.items()):
	if i == len(nodes)-1:
		file.write("\t\t{\"id\": \""+str(_id)+"\", \"name\": \""+str(nodo)+"\" }\n")
	else:
		file.write("\t\t{\"id\": \""+str(_id)+"\", \"name\": \""+str(nodo)+"\" },\n")
 
file.write("\t],\n\t\"links\": [\n")
for i,(function,list_function) in enumerate(functions.items()):
	_id = nodes[function]
	for j,node in enumerate(list_function):
		if i == len(functions)-1 and j == len(list_function)-1:
			file.write("\t\t{\"source\": \""+str(nodes[function])+"\", \"target\": \""+str(nodes[node])+"\" }\n")
		else:
			file.write("\t\t{\"source\": \""+str(nodes[function])+"\", \"target\": \""+str(nodes[node])+"\" },\n")

file.write("\t]\n}")
file.close()  