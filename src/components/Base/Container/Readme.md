Row container:
```jsx
<Container>
  {[1,2,3].map((idx) => {
    return (<Container key={idx} flex="1 1 auto">Column {idx}</Container>)
  })}
</Container>
```
Column container:
```jsx
<Container isColumn>
  {[1,2,3].map((idx) => {
    return (<Container key={idx} flex="1 1 auto">Row {idx}</Container>)
  })}
</Container>
```
