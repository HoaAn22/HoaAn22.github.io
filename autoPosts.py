from bs4 import BeautifulSoup

with open("dropdown-menu.html", "r", encoding="utf-8") as file:
    soup = BeautifulSoup(file, "html.parser")

# print(soup.prettify())