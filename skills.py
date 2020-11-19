import re
f=open("all.txt",'r',encoding="utf-8");
skills=[]
letters=["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

node={"a":{}, "b":{}, "c":{}, "d":{}, "e":{}, "f":{}, "g":{}, "h":{}, "i":{}, "j":{}, "k":{}, "l":{}, "m":{}, "n":{}, "o":{}, "p":{}, "q":{}, "r":{}, "s":{}, "t":{}, "u":{}, "v":{}, "w":{}, "x":{}, "y":{}, "z":{},"top5":[]}
for line in f:
    skills.append(line.strip())

# x=0
# def crateTrie(trie):
#     global x
#     for letter in letters:
#         trie[letter]=node
#         x=x+1
#         if(x<5):
#             crateTrie(trie[letter])
#     return trie

# jsonFile=open('skill.json','w')
# jsonFile.write(str(crateTrie(node)))
# jsonFile.close()
def findWord(*args):
    words=[]
    for skill in skills:
        if(re.search('^'+"{}".format("".join(args)) +'+',skill)):
           words.append(skill)
    print(words)
findWord('M','o','');
        
    

