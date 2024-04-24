import pymongo
import json
from pymongo import MongoClient, InsertOne
import csv
import json

client = pymongo.MongoClient("mongodb+srv://kieranpeel:p4cgqja2BdW8pSWG@backendtest.3etqmzq.mongodb.net/")
db = client.BackendTest
collection = db."PT-Backend-Server"
requesting = []

#Convert csv first to json
csvfile = open(r"./data/data_sample.csv", 'r')
jsonfile = open('./data/data.json', 'w')
fieldnames = ("#",
              "Status",
              "ppoidx",
              "Vessel Name",
              "NS",
              "Segment",
              "Mutuality",
              "IMO",
              "Ship Type",
              "GXL Category",
              "Grs Tonnage",
              "Built Year",
              "Vessel Flag",
              "Domicile",
              "Memb. Exper.",
              "DRAT",
              "NPRI Limit ($m)",
              "Ded. Fee Treatment",
            "Cgo Evt/Voy",
            "Ded Cgo",
            "Crew Evt/Voy",
            "Ded Crew",
            "Ded Stev.",
            "Ded Pass.",
            "Ded FFO",
            "RDC 1/4ths",
            "Ded Coll.",
            "Ded Poll.",
            "Ded Other",
            "Cargo",
            "Crew Accident",
            "Crew Illness",
            "Stevedore & 3rd Party",
            "Passenger",
            "Fixed & Floating Objects",
            "Collision",
            "Pollution",
            "Deviations, Stowaways & Fines",
            "Accidents and Breakdowns",
            "Retained",
            "Abatement",
            "Before Modifiers",
            "After AADL",
            "After Sliders",
            "Pool",
            "RI GXL",
            "RI NON-GXL",
            "Mgt. Expenses",
            "Total Loads",
            "Total Premium",
            "Check0",
            "Rate per Ton",
            "ALR Retained",
            "ALR Retained Less Expenses"
)


reader = csv.DictReader( csvfile, fieldnames)
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write('\n')
    
with open(r"./data/data.json") as f:
    for jsonObj in f:
        myDict = json.loads(jsonObj)
        requesting.append(InsertOne(myDict))


result = collection.bulk_write(requesting)
client.close()