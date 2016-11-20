# dndTower
Simple Dungeons and Dragons 2-ish combat simulator

Uses angular and characters, simple stick man sprites.
Attempted to add some choice around specializing the random attributes but it isn't working.

Presuming you've got node, you can get things ready with (you may need sudo)
>npm update
>npm install -g angular grunt bower 

Not needed unless you're generating things:
>npm install -g yo generator-angular generator-karma
clone this, I prefer ssh:
>git clone git@github.com:DavidLDawes/dndTower.git

but if you don't have keys setup https works:
>https://github.com/DavidLDawes/dndTower.git
>cd dndTower

Next use npm and bower to get the local stuff installed
>npm install
>bower install

Finally, grunt tasks are used as needed:
>grunt clean build serve

I usually have to add --force because I don't have compass installed,
which causes a warning which is enough to stop it if you do not use --force:
>grunt clean build serve --force

