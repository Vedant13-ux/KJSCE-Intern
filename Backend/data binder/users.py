import sys,json
print("Output from Python") 
print("First name: " + sys.argv[1]) 
print("Last name: " + sys.argv[2]) 
user={"user1":[sys.argv[1],sys.argv[2]]};
with open('./users.json','w') as f:
    json.dump(user,f,indent=2)