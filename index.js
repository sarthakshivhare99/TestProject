<Grid container spacing={3}>
                {data && data.map((item, index) => (
                    <Grid item xs={12} key={index}>
                        <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
                            <Typography variant="h6">Record {index + 1}</Typography>
                            <Grid container spacing={2}>
                                {/* Loop through each key-value pair in the current record */}
                                {Object.keys(item).map((key) => (
                                    <React.Fragment key={key}>
                                        <Grid item xs={6}>
                                            <Typography variant="body1" fontWeight="bold">
                                                {key}:
                                         </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2">
                                                {item[key]}
                                            </Typography>
                                        </Grid>
                                    </React.Fragment>
                                ))}
                            </Grid>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
