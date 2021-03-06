'''
    tables.py
    This file defines the tables to be used in sqlalchemy of app.py
'''
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base

BASE = declarative_base()


# pylint: disable=E1101
# pylint: disable=R0903
class Comment(BASE):
    '''Defines the Messages table'''
    __tablename__ = 'comment'
    id = Column(Integer, primary_key=True)
    tab = Column(String(50))
    name = Column(String(100))
    text = Column(String(1000))
    time = Column(DateTime(timezone=False))

    def __init__(self, text, name, tab, time):
        self.text = text
        self.name = name
        self.tab = tab
        self.time = time

    def __repr__(self):
        return 'Comment: %s, On Tab: %s' % (self.text, self.tab)
