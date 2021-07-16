---
title: Augusta's Cube
excerpt: How many cubes did Augusta remove?
---
{% include header.html %}

Starting with a $9\times9\times9$ cube, Augusta removed as few $1\times1\times1$ cubes as possible so that the resulting sculpture had front view, top view and side view all the same, as shown.
How many $1\times1\times1$ cubes did Augusta remove?
![Augusta's Cube]({% link static/augustas-cube.png %})

<details>
  <summary>Click to show solution</summary>
  
 <blockquote> Answer: 329</blockquote>   
  
 <p>
  The only cubes that Augusta has to remove are those that are in one of the 9 holes in at least one of the 3 views.
 </p>
  
 <p>
  Consider first making the central $3\times3$ hole from each direction. Each such hole can be considered as three $3\times3\times3$ cubes, but the three directions have a central $3\times3\times3$ cube in common. Consequently $7\times3^3=7\times27=189$ unit cubes are removed to make these holes, and $20\times33=540$ cubes are left.
 </p>
  
 <p>
  Now consider the $1\times1$ holes from each direction. Each of the twenty $3\times3\times3$ cubes remaining will have $7$ unit cubes removed, so $20\times7=140$ unit cubes in all.
  In total, Augusta removes $189 + 140=329$ unit cubes  
 </p>
 
</details>
