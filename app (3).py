import streamlit as st
import pandas as pd

st.title("Interactive Data Dashboard")

uploaded_file = st.file_uploader("Upload a CSV file", type=["csv"])

if uploaded_file is not None:
    df = pd.read_csv(uploaded_file)

    st.write("### Preview of Uploaded Data:")
    st.dataframe(df.head())

    # Filtering for columns with < 20 unique values
    filter_cols = [col for col in df.columns if df[col].nunique() < 20]
    filtered_df = df.copy()
    if filter_cols:
        st.write("### Filter Data:")
        for col in filter_cols:
            options = df[col].unique().tolist()
            selected = st.multiselect(f"Filter by {col}", options)
            if selected:
                filtered_df = filtered_df[filtered_df[col].isin(selected)]

    st.write("### Filtered Data:")
    st.dataframe(filtered_df)

    # Download button for filtered data
    csv = filtered_df.to_csv(index=False).encode('utf-8')
    st.download_button(
        label="Download filtered data as CSV",
        data=csv,
        file_name="filtered_data.csv",
        mime="text/csv"
    )

    # Detect numeric columns
    numeric_cols = filtered_df.select_dtypes(include=['number']).columns.tolist()
    if numeric_cols:
        st.write("### Numeric Columns Detected:")
        st.write(numeric_cols)
        selected_col = st.selectbox("Select a numeric column to visualize", numeric_cols)
        st.write(f"#### Line Chart for {selected_col}")
        st.line_chart(filtered_df[selected_col])
        st.write(f"#### Bar Chart for {selected_col}")
        st.bar_chart(filtered_df[selected_col])
    else:
        st.warning("No numeric columns found in the uploaded CSV.")
