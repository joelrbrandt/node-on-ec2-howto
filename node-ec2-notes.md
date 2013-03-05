Setting up a Node server on EC2
===============================

## Basic EC2 setup

1. Select your region in the upper right corner of the management console. I always use N. California, since that's where I live, but Oregon is a little cheaper.
2. Launch a Ubuntu instance. I chose a "Ubuntu Server 12.04.1 LTS 64-bit" server using the Quick Launch wizard. If you don't already have a keypair, you'll have to create one.
3. Optional: Immediately shut down the instance and change the instance type to "m1.medium" (or larger). This will make the setup steps _much_ faster. You can always scale it back later. Note: When you change instance sizes, elastic IP mappings can get hosed. You may need to unassociate and reassociate them.
4. Add an elastic IP that is mapped to the new instance.
5. Log in to your new instance with something like: ```ssh -i yourkey.private ubuntu@your.elastic.ip```
6. Edit your security group for the instance to allow HTTP/HTTPS access and maybe ICMP (ping) access
7. Optional: Set up an additional user on your instance with ```sudo adduser [username]```. Once that is set up, add the new user to the "admin" group (so they can sudo) with ```sudo adduser [username] admin```
8. Optional: Enable password-based login via ssh by editing /etc/ssh/sshd_config. There should be a line that says ```PasswordAuthentication no```. Change "no" to "yes". (Note that the comment above it is out of date and confusing). Restart sshd with ```sudo service ssh restart``` to make changes take effect.
9. Optional: Log out and then try to ssh in with your new account and a password.
10. Update installed packages with ```sudo apt-get update``` followed by ```sudo apt-get dist-upgrade```
11. Optional: Install emacs23-nox with ```sudo apt-get install emacs23-nox``` so Joel can use the computer. 
12. Optional: Make an image of the instance in the current state (or after setting up node).

## Setting up node

Unfortunately, the version of node in apt is 0.6.x. More unfortunately, the Joyent guys don't distribute binaries for node. Fortunately, it's easy to build from scratch.

For security, ease of upgrading, and so-on, I recommend installing the node executable in a single user's home directory (not owned/installed by root). 

1. Install build essentials (like gcc) with ```sudo apt-get install build-essential```
2. Install git with ```sudo apt-get install git```
3. Make a new folder, e.g. "~/development" and clone node into that folder (```git clone https://github.com/joyent/node.git```)
4. Switch to the node directory and check out a version tag (e.g. ```git checkout v0.8.21```)
5. Configure node to install to a local directory (e.g. ```./configure --prefix=~/bin/node```)
6. Run ```make``` (using the option "-j8" seems to be about right on a medium instance)
7. Run ```make install```. That will put all of node in the "prefix" path specified above. This directory is completely self-contained and can be moved, copied to other users, etc.
8. Optional: Put the node/bin directory in your path. Add something like the following to your .profile (and then logging back out and back in):

    ```bash
# set PATH so it includes user's private node 'bin' directory if it exists
if [ -d "$HOME/bin/node/bin" ] ; then
    PATH="$HOME/bin/node/bin:$PATH"
fi
```


## Running node as an unprivileged user on ports 80/443

## Running node as a service

## SSL with node