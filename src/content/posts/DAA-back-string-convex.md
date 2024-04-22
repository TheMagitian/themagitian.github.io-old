---
title: Activity selection, backtracking, string matching, convex hull
published: 2024-01-21
description: Code for Algorithms problems
tags: [Algorithms, DAA]
keywords: [Algorithms, C++]
category: Algorithms
draft: false
---

# Activity Selection sorting - recursive

Given a set 'S' of 'n' activities, implement the recursive greedy algo to select a subset of activities from S by selecting the task that finishes first. Sort them in ascending order based on finish time and then select the activities.

## Input:
- Number of activities
- _n_ lines contain details of activities such as name, start and finish time

## Output:
Name of activites that are selected separated by a space

## Code:
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

struct Activity {
  string name;
  int start, finish;
};

bool compareFinishTime(const Activity& a, const Activity& b) {
  return a.finish < b.finish;
}

void selectActivities(vector<Activity>& activities, int n, vector<Activity>& selected, int lastFinishTime) {
  if (n==0) return;
  int nextActivity =-1;
  for (int i=0; i<activities.size(); i++) {
	if (activities[i].start >= lastFinishTime) {
	  nextActivity = i;
	  break;
	}
  }

  if (nextActivity==-1) return;
  selected.push_back(activities[nextActivity]);
  selectActivities(activities, n-1, selected, activities[nextActivity].finish);
}

int main() {
  int n;
  cin >> n;
  vector<Activity> activities(n);
  for (int i=0; i<n; i++) {
	cin >> activities[i].name >> activities[i].start >> activities[i].finish;
  }
  sort(activities.begin(), activities.end(), compareFinishTime);

  vector<Activity> selected;
  selectActivities(activities, n, selected, 0);

  for (const auto& activity: selected) {
	cout << activity.name << " ";
  }
  cout << endl;
  return 0;
}
```

---

# String matching - Rabin-Karp algorithm

```cpp
#include<iostream>
using namespace std;
#include<string>
#include<math.h>
int valueOf(char ch)
{
    return (ch-'0');
}
bool check_characters(string T, string P, int s)
{
    int n,m,i;
    n = T.length();
    m = P.length();
    for(i=0;i<m;i++)
    {
        if(P[i]!=T[s+i+1])
            return false;
    }
    return true;
}
void rabin_karp_matcher(string T, string P, int d, int q)
{
    int n, m, h, p, t0, i,s;
    n = T.length();
    m = P.length();
    h = (int)pow(d,m-1)%q;
    cout<<"h value is "<<h<<endl;
    p = 0;
    t0 = 0;
    for(i=0;i<m;i++)
    {
        p = (d*p + valueOf(P[i]))%q;
        t0 = (d*t0 + valueOf(T[i]))%q;
    }
    for(s=-1;s<n-m;s++)
    {
        cout<<p<<" "<<t0<<endl;
        if(p==t0)
        {
           if (check_characters(T,P,s))
                cout<<s+1<<endl;
        }
        if(s<n-m)
            t0 = (d*(t0-valueOf(T[s+1])*h)+valueOf(T[s+m+1]))%q;
    }
}
```

---


# Rabin-Karp matching - with wildcards in pattern
Given a text string _T_ and a wildcard pattern string _P_, where the wildcard character `*` can match zero or more characters, implement a wildcard matching algorithm using the Rabin-Karp algorithm to determine if the pattern matches any substring of the text.

## Input:
- A text string _T_
- A wildcard pattern string _P_ of length `m`
- _T_ and _P_ are given on different lines.

## Output:
- Print **Match found** if the pattern string matches any substring of the text string, considering the wildcard character `*`.
- Print **No match found** otherwise.

## Eg input:
abacabadabacaba
aba*a

## Eg output:
Match found

## Code:
```cpp
#include <iostream>
#include <string>
#include <vector>

using namespace std;

bool wildCardMatch(const string& text, const string& pattern) {
    int n = text.length();
    int m = pattern.length();
    
    // Initialize dp table
    vector<vector<bool>> dp(n + 1, vector<bool>(m + 1, false));
    dp[0][0] = true;

    // Fill the first row
    for (int j = 1; j <= m; ++j) {
        if (pattern[j - 1] == '*') {
            dp[0][j] = dp[0][j - 1];
        }
    }

    // Fill the dp table
    for (int i = 1; i <= n; ++i) {
        for (int j = 1; j <= m; ++j) {
            if (pattern[j - 1] == '*') {
                dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
            } else if (pattern[j - 1] == '?' || text[i - 1] == pattern[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            }
        }
    }

    return dp[n][m];
}

int main() {
    string text, pattern;
    cout << "Enter the text string: ";
    cin >> text;
    cout << "Enter the wildcard pattern string: ";
    cin >> pattern;

    if (wildCardMatch(text, pattern)) {
        cout << "Match found" << endl;
    } else {
        cout << "No match found" << endl;
    }

    return 0;
}
```
---

# Love Diagonal Hate 3 Queen Game
Love diagonal hate 3 queen is a game in which we have to place min(m, n) queens on a mxn rectangular board. The rows and columns are numbered from 1 to m and 1 to n resp. We cannot place a queen on a cell if sum if their row and column indices is divisible by 3, eg: (1, 2), (5, 1) etc. A queen is attacked by another queen if they are on the same row or in the same column. For example, if the dimensions of the rectangular board is 4x5, then one of the solution is:

	1 0 0 0 0
	0 1 0 0 0
	0 0 0 1 0
	0 0 1 0 0

There are 6 such possible solutions for this board dimension. Given the dimension of the rectangular board, develop a recursive algorithm using backtracking technique to find different solutions.

## Input:
- 1st line contains number of rows `m`
- 2nd line contains number of cols `n`

## Output:
- Number of solutions

## Code:
```cpp
#include <iostream>
#include <vector>
using namespace std;

int m, n, count;

bool isSafe(int row, int col, vector<vector<int>>& board) {
  if ((row+1 + col+1) % 3==0) {
	return false;
  }

  for (int i=0; i<row; i++) {
	if (board[i][col] == 1) return false;
  }
  return true;
}

void place(int row, vector<vector<int>>& board) {
  if (row==min(m, n)) {
	count++;
	return;
  }

  for (int col=0; col<n; col++) {
	if (isSafe(row, col, board)) {
	  board[row][col] = 1;
	  place(row+1, board);
	  board[row][col] = 0; // backtracking
	}
  }
}

int solve(int rows, int cols) {
  m = rows, n = cols;
  vector<vector<int>> board(m, vector<int>(n, 0));
  count = 0;
  place(0, board);
  return count;
}

int main() {
  int m, n;
  cin >> m >> n;
  cout << solve(m, n) << endl;
  return 0;
}
```

--- 

# Convex Hull Construction

Given a set of points in the 2D plane, compute the convex hull of the points.

## Input:
- The first line contains an integer 𝑁, the number of points.
- 𝑁 lines follow, each containing two integers 𝑥 and 𝑦, the coordinates of a point.

## Output:
- The convex hull in counter-clockwise order.

## Sample Input:
6
1 1
2 2
2 4
3 3
4 2
4 4

## Sample Output:
1 1
2 2
4 2
4 4
2 4

## Code:
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Point {
    int x, y;
};

// Returns cross product of vectors p1p2 and p1p3
int crossProduct(const Point &p1, const Point &p2, const Point &p3) {
    return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
}

// Sort points lexicographically first by x-coordinate and then by y-coordinate
bool compare(const Point &p1, const Point &p2) {
    return (p1.x < p2.x) || (p1.x == p2.x && p1.y < p2.y);
}

// Computes the convex hull of a set of points
vector<Point> convexHull(vector<Point> &points) {
    int n = points.size();
    sort(points.begin(), points.end(), compare);

    vector<Point> hull;
    // Lower hull
    for (int i = 0; i < n; ++i) {
        while (hull.size() >= 2 && crossProduct(hull[hull.size() - 2], hull[hull.size() - 1], points[i]) <= 0)
            hull.pop_back();
        hull.push_back(points[i]);
    }

    // Upper hull
    for (int i = n - 2, t = hull.size() + 1; i >= 0; --i) {
        while (hull.size() >= t && crossProduct(hull[hull.size() - 2], hull[hull.size() - 1], points[i]) <= 0)
            hull.pop_back();
        hull.push_back(points[i]);
    }

    // Remove duplicate points
    hull.pop_back();
    if (hull.size() > 1 && hull.front().x == hull.back().x && hull.front().y == hull.back().y)
        hull.pop_back();

    return hull;
}

int main() {
    int n;
    cin >> n;
    vector<Point> points(n);
    for (int i = 0; i < n; ++i)
        cin >> points[i].x >> points[i].y;

    vector<Point> convexH = convexHull(points);
    for (const auto &point: convexH)
        cout << point.x << " " << point.y << endl;
    return 0;
}
```

---

# Intersecting segments problem

## Input:
- `n` - number of line segments
- Each line consists of _a1_, _b1_, _a2_, _b2_, where the line segment is (a1, b1) -> (a2, b2).

## Output:
- List of all intersecting points in a separate line each.

## Code:
```cpp
#include <iostream>
#include <vector>

using namespace std;

struct Point {
    double x, y;
};

struct Segment {
    Point start, end;
};

double crossProduct(const Point& a, const Point& b, const Point& c) {
    return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

bool onSegment(const Point& p, const Point& q, const Point& r) {
    return q.x <= max(p.x, r.x) && q.x >= min(p.x, r.x) &&
           q.y <= max(p.y, r.y) && q.y >= min(p.y, r.y);
}

bool intersect(const Segment& s1, const Segment& s2, Point& intersection) {
    double d1 = crossProduct(s1.start, s1.end, s2.start);
    double d2 = crossProduct(s1.start, s1.end, s2.end);
    double d3 = crossProduct(s2.start, s2.end, s1.start);
    double d4 = crossProduct(s2.start, s2.end, s1.end);

    if (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) &&
        ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))) {
        double t = d1 / (d1 - d2);
        intersection.x = s2.start.x + t * (s2.end.x - s2.start.x);
        intersection.y = s2.start.y + t * (s2.end.y - s2.start.y);
        return true;
    }

    if (d1 == 0 && onSegment(s1.start, s2.start, s1.end)) {
        intersection = s2.start;
        return true;
    }
    if (d2 == 0 && onSegment(s1.start, s2.end, s1.end)) {
        intersection = s2.end;
        return true;
    }
    if (d3 == 0 && onSegment(s2.start, s1.start, s2.end)) {
        intersection = s1.start;
        return true;
    }
    if (d4 == 0 && onSegment(s2.start, s1.end, s2.end)) {
        intersection = s1.end;
        return true;
    }

    return false;
}

int main() {
    int n;
    cout << "Enter the number of line segments: ";
    cin >> n;

    vector<Segment> segments(n);
    cout << "Enter the endpoints of each line segment (x1 y1 x2 y2):" << endl;
    for (int i = 0; i < n; ++i) {
        cin >> segments[i].start.x >> segments[i].start.y >> segments[i].end.x >> segments[i].end.y;
    }

    vector<Point> intersections;
    for (int i = 0; i < n; ++i) {
        for (int j = i + 1; j < n; ++j) {
            Point intersection;
            if (intersect(segments[i], segments[j], intersection)) {
                intersections.push_back(intersection);
            }
        }
    }

    if (!intersections.empty()) {
        cout << "Intersecting points found:" << endl;
        for (const Point& p : intersections) {
            cout << "(" << p.x << ", " << p.y << ")" << endl;
        }
    } else {
        cout << "No intersecting points found." << endl;
    }

    return 0;
}
```

---

# Closest pair of points
Given a set of _n_ points in a 2D plane, find the pair of points with the smallest Euclidean distance between them.

## Input:
- The input consists of an integer _n_ (2≤ _n_ ≤ 10^5) representing the number of points.
- _n_ lines follow, each containing two space-separated floating-point numbers _x_ and _y_ representing the coordinates of the points.

## Output:
- Two space-separated pairs of floating-point numbers representing the coordinates of the two points that have the smallest Euclidean distance between them.

## Code:
```cpp
#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>
#include <limits>

using namespace std;

struct Point {
    double x, y;
};

double euclideanDistance(const Point& p1, const Point& p2) {
    return sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
}

bool sortByX(const Point& a, const Point& b) {
    return a.x < b.x;
}

bool sortByY(const Point& a, const Point& b) {
    return a.y < b.y;
}

pair<Point, Point> closestPairUtil(const vector<Point>& pointsSortedByX, const vector<Point>& pointsSortedByY) {
    int n = pointsSortedByX.size();

    if (n <= 3) {
        double minDist = numeric_limits<double>::max();
        pair<Point, Point> closestPair;
        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                double dist = euclideanDistance(pointsSortedByX[i], pointsSortedByX[j]);
                if (dist < minDist) {
                    minDist = dist;
                    closestPair = {pointsSortedByX[i], pointsSortedByX[j]};
                }
            }
        }
        return closestPair;
    }

    int mid = n / 2;
    vector<Point> leftX(pointsSortedByX.begin(), pointsSortedByX.begin() + mid);
    vector<Point> rightX(pointsSortedByX.begin() + mid, pointsSortedByX.end());

    vector<Point> leftY, rightY;
    for (const Point& p : pointsSortedByY) {
        if (p.x <= pointsSortedByX[mid].x)
            leftY.push_back(p);
        else
            rightY.push_back(p);
    }

    pair<Point, Point> leftClosest = closestPairUtil(leftX, leftY);
    pair<Point, Point> rightClosest = closestPairUtil(rightX, rightY);

    double minDist = min(euclideanDistance(leftClosest.first, leftClosest.second),
                         euclideanDistance(rightClosest.first, rightClosest.second));
    pair<Point, Point> closestPair = minDist == euclideanDistance(leftClosest.first, leftClosest.second) ? leftClosest : rightClosest;

    vector<Point> strip;
    double midX = pointsSortedByX[mid].x;
    for (const Point& p : pointsSortedByY) {
        if (abs(p.x - midX) < minDist)
            strip.push_back(p);
    }

    int stripSize = strip.size();
    for (int i = 0; i < stripSize; ++i) {
        for (int j = i + 1; j < min(i + 7, stripSize); ++j) {
            double dist = euclideanDistance(strip[i], strip[j]);
            if (dist < minDist) {
                minDist = dist;
                closestPair = {strip[i], strip[j]};
            }
        }
    }

    return closestPair;
}

pair<Point, Point> closestPair(vector<Point>& points) {
    vector<Point> pointsSortedByX = points;
    vector<Point> pointsSortedByY = points;
    sort(pointsSortedByX.begin(), pointsSortedByX.end(), sortByX);
    sort(pointsSortedByY.begin(), pointsSortedByY.end(), sortByY);
    return closestPairUtil(pointsSortedByX, pointsSortedByY);
}

int main() {
    int n;
    cout << "Enter the number of points: ";
    cin >> n;

    vector<Point> points(n);
    cout << "Enter the coordinates of each point (x y):" << endl;
    for (int i = 0; i < n; ++i) {
        cin >> points[i].x >> points[i].y;
    }

    pair<Point, Point> closest = closestPair(points);
    cout << "Closest pair of points: (" << closest.first.x << ", " << closest.first.y << ") and (" 
         << closest.second.x << ", " << closest.second.y << ")" << endl;

    return 0;
}
```

---

# KMP Algorithm

## Code:
```cpp
// C++ program for implementation of KMP pattern searching
// algorithm

#include <bits/stdc++.h>

void computeLPSArray(char* pat, int M, int* lps);

// Prints occurrences of pat[] in txt[]
void KMPSearch(char* pat, char* txt)
{
	int M = strlen(pat);
	int N = strlen(txt);

	// create lps[] that will hold the longest prefix suffix
	// values for pattern
	int lps[M];

	// Preprocess the pattern (calculate lps[] array)
	computeLPSArray(pat, M, lps);

	int i = 0; // index for txt[]
	int j = 0; // index for pat[]
	while ((N - i) >= (M - j)) {
		if (pat[j] == txt[i]) {
			j++;
			i++;
		}

		if (j == M) {
			printf("Found pattern at index %d ", i - j);
			j = lps[j - 1];
		}

		// mismatch after j matches
		else if (i < N && pat[j] != txt[i]) {
			// Do not match lps[0..lps[j-1]] characters,
			// they will match anyway
			if (j != 0)
				j = lps[j - 1];
			else
				i = i + 1;
		}
	}
}

// Fills lps[] for given pattern pat[0..M-1]
void computeLPSArray(char* pat, int M, int* lps)
{
	// length of the previous longest prefix suffix
	int len = 0;

	lps[0] = 0; // lps[0] is always 0

	// the loop calculates lps[i] for i = 1 to M-1
	int i = 1;
	while (i < M) {
		if (pat[i] == pat[len]) {
			len++;
			lps[i] = len;
			i++;
		}
		else // (pat[i] != pat[len])
		{
			// This is tricky. Consider the example.
			// AAACAAAA and i = 7. The idea is similar
			// to search step.
			if (len != 0) {
				len = lps[len - 1];

				// Also, note that we do not increment
				// i here
			}
			else // if (len == 0)
			{
				lps[i] = 0;
				i++;
			}
		}
	}
}

// Driver code
int main()
{
	char txt[] = "ABABDABACDABABCABAB";
	char pat[] = "ABABCABAB";
	KMPSearch(pat, txt);
	return 0;
}
```

# Rabin-Karp - CLRS

## Code:
```cpp
/* Following program is a C++ implementation of Rabin Karp
Algorithm given in the CLRS book */
#include <bits/stdc++.h>
using namespace std;

// d is the number of characters in the input alphabet
#define d 256

/* pat -> pattern
	txt -> text
	q -> A prime number
*/
void search(char pat[], char txt[], int q)
{
	int M = strlen(pat);
	int N = strlen(txt);
	int i, j;
	int p = 0; // hash value for pattern
	int t = 0; // hash value for txt
	int h = 1;

	// The value of h would be "pow(d, M-1)%q"
	for (i = 0; i < M - 1; i++)
		h = (h * d) % q;

	// Calculate the hash value of pattern and first
	// window of text
	for (i = 0; i < M; i++) {
		p = (d * p + pat[i]) % q;
		t = (d * t + txt[i]) % q;
	}

	// Slide the pattern over text one by one
	for (i = 0; i <= N - M; i++) {

		// Check the hash values of current window of text
		// and pattern. If the hash values match then only
		// check for characters one by one
		if (p == t) {
			/* Check for characters one by one */
			for (j = 0; j < M; j++) {
				if (txt[i + j] != pat[j]) {
					break;
				}
			}

			// if p == t and pat[0...M-1] = txt[i, i+1,
			// ...i+M-1]

			if (j == M)
				cout << "Pattern found at index " << i
					<< endl;
		}

		// Calculate hash value for next window of text:
		// Remove leading digit, add trailing digit
		if (i < N - M) {
			t = (d * (t - txt[i] * h) + txt[i + M]) % q;

			// We might get negative value of t, converting
			// it to positive
			if (t < 0)
				t = (t + q);
		}
	}
}

/* Driver code */
int main()
{
	char txt[] = "GEEKS FOR GEEKS";
	char pat[] = "GEEK";

	// we mod to avoid overflowing of value but we should
	// take as big q as possible to avoid the collison
	int q = INT_MAX;

	// Function Call
	search(pat, txt, q);
	return 0;
}
```
