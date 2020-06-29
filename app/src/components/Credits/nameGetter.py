import json

#Opens the credits markdown file
names = open(r'app\src\components\Credits\Credits.md')
namesList = names.read().split('\n')

#Opens the output file for writing
infoFile = open(r'app\src\components\Credits\namesAndThemes.json', 'wt')

#Declares variables and files for parsing
namesAndCreators = {}
themeNamesBuffer = open(r'server\themes.json')
OGThemes = json.load(themeNamesBuffer)
themes = list(map(lambda x : x['name'], OGThemes))

#Finds a match for every theme name in the credits file
#'r' is the current theme name
def credit(r):
    for i in range(len(namesList)):
        line = namesList[i]
        lineWords = line.split()

        for e in range(len(lineWords)):
          if (r.split()[0] == lineWords[e])
            return {
                'name': r,
                'note': line
            }

namesAndCreators['credits'] = list(map(credit, themes))

json = json.dumps(namesAndCreators, indent = 4, sort_keys = True)
infoFile.write(json)