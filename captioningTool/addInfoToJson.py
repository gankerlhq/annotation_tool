fRead=open(input("Filename of input: "),"r+")
fWrite=open(input("Filename of output: "),"w+")

text = fRead.readlines()[0]

fWrite.write("data='[")
fWrite.write(text)
fWrite.write("]'")
