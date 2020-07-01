import json

#Opens the credits markdown file
names = open(r'app\src\components\Credits\Credits.md')
namesList = names.read().split('\n')

#Opens the output file for writing
infoFile = open(r'app\src\components\Credits\namesAndThemes.json', 'wt')

#Declares variables and files for parsing
namesAndCreators = {}
themesBuffer = open(r'server\themes.json')
themes = json.load(themesBuffer)

#Finds a match for every theme name in the credits file
#'r' is the current theme name
def credit(r):
    line = ''
    note = ''

    for i in range(len(namesList)):
        line = namesList[i]
        lineWords = line.split()
        nameWords = r['name'].split()
        foundName = False

        for e in range(len(lineWords)):
            for o in range(len(nameWords)):
                if (len(nameWords) > 1):
                    if (foundName == True):
                        if (o == len(nameWords) - 1 and lineWords[e] == nameWords[o]):
                            note = line
                    else:
                        if (o == 0 and lineWords[e] == nameWords[o]):
                            foundName = True
                else:
                    if(lineWords[e] == nameWords[o]):
                        note = line
                        
    return {
        'name': r['name'],
        'note': 'Not Found' if note == '' else note,
        'dark': r['isDark']
    }

namesAndCreators['credits'] = list(map(credit, themes))

json = json.dumps(namesAndCreators, indent = 4, sort_keys = True)
infoFile.write(json)