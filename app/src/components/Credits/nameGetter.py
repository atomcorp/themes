#Opens the original file
originalInfoFile = open(r'C:\Users\Andrey\source\repos\iTerm2-Color-Schemes\README.md')
originalInfoFileText = originalInfoFile.read()
originalInfoFileTextList = originalInfoFileText.split('\n')

#Opens the file and resets to a blank line
infoFile = open(r'C:\Users\Andrey\source\repos\themes\app\src\components\Credits\namesAndThemes.txt', 'wt')
infoFile.write('')
infoFile.close()
#Reopens the file to write the output
infoFile = open(r'C:\Users\Andrey\source\repos\themes\app\src\components\Credits\namesAndThemes.txt', 'at')

#Declares variables for parsing
creditsTitle = 0
endOfCredits = 0
namesAndCreators = []

#Iterates to check where the credits start
for i in range(len(originalInfoFileTextList)):
    if(originalInfoFileTextList[i] == '## Credits'):
        creditsTitle = i
        break
    else:
        continue

#Iterates to check where the credits end
for i in range(len(originalInfoFileTextList)):
    if(originalInfoFileTextList[i] == 'If there are other color schemes you\'d like to see included, drop me a line!'):
        endOfCredits = i
        break
    else:
        continue

#Itererates to find themes and credits and adds them to a list
for i in range(creditsTitle + 4, endOfCredits):
    addend = ''
    line = originalInfoFileTextList[i].split()

    #Checks positioning of the theme name
<<<<<<< HEAD
    #Checks if the line is blank
    if(line):
        #Checks if the line says 'The theme _' or 'The _ theme'
        if(line[1] != 'theme' and line[1] != 'scheme'):
            #Tries to see if the theme name is longer than one
=======
    if(line):
        if(line[1] != 'theme' and line[1] != 'scheme'):
>>>>>>> 2ffec3b9a4aa0d93c978202330d5c093195be253
            try:
                if(line[line.index('The') + 1] == line[line.index('theme') - 1]):
                    theme = line[line.index('The') + 1]
                else:
                    theme = line[line.index('The') + 1] + ' ' + line[line.index('theme') - 1]
<<<<<<< HEAD
            #If the try fails, it falls back to the default
            except:
                theme = line[1]
        else:
            #Does the same thing as above, just with the different word configuration
=======
            except:
                theme = line[1]
        else:
>>>>>>> 2ffec3b9a4aa0d93c978202330d5c093195be253
            try:
                if(line[line.index('theme') + 1] == line[line.index('was') - 1]):
                    theme = line[line.index('theme') + 1]
                else:
                    theme = line[line.index('theme') + 1] + ' ' + line[line.index('was') - 1]
            except:
                theme = line[2]

        #Checks positioning of the creators' name
        try:
            if(line[line.index('by') + 1] == 'the'):
                continue
            else:
                credit = line[line.index('by') + 1]
        except:
            continue

        addend = theme + ':' + credit
    
    namesAndCreators.append(addend)

for i in range(len(namesAndCreators)):
    infoFile.write(namesAndCreators[i] + '\n')